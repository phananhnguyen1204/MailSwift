namespace API.Middleware
{
    public class UserMiddleware {
        private readonly RequestDelegate _next;

        public UserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("X-User-Id", out var userId))
            {
                context.Items["UserId"] = userId.ToString();
            }

            await _next(context);
        }
    }
}