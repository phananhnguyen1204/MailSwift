import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error("Network or server error:", error);
      toast.error("Network error. Please check your connection or server.");
      return Promise.reject(error);
    }

    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title || "Bad Request");
        break;
      case 401:
        toast.error(data.title || "Unauthorized");
        break;
      case 500:
        toast.error(data.title || "Server Error");
        break;
      default:
        toast.error("An unexpected error occurred");
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body?: object) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body?: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Document = {
  list: () => requests.get("documents"),
  details: (id: number) => requests.get(`documents/${id}`),
};

const DocumentContainer = {
  get: () =>
    requests
      .get("documentcontainer")
      .then((response) => response.userDocuments),
  createDoc: (docData: object) =>
    requests.post("documentcontainer/create", docData),
  updateDoc: (id: number, docData: object) =>
    requests.put(`documentcontainer/update/${id}`, docData),
  removeDoc: (id: number) => requests.delete(`documentcontainer/remove/${id}`),
};

const TestErrors = {
  get400Errors: () => requests.get("buggy/bad-request"),
  get401Errors: () => requests.get("buggy/unauthorized"),
  get404Errors: () => requests.get("buggy/not-found"),
  get500Errors: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Document,
  TestErrors,
  DocumentContainer,
};

export default agent;
