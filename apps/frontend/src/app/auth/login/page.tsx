export default function LoginPage(): JSX.Element {
  return (
    <section className="min-h-svh w-full bg-background flex justify-center items-center p-8">
      <div className="ring-1 ring-border/70 ring-offset-card-bg ring-offset-4 shadow-lg rounded-lg border border-border max-w-lg w-full p-8">
        <p className="text-xl font-medium text-foreground">Welcome Back</p>
        <p className="mt-1 text-sm text-primary-500">
          Start your journey with us by logging in.
        </p>
        <div className="my-6 h-px w-full bg-border" />
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-xs font-medium text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="rounded-md border border-border h-10 text-sm text-primary-900 placeholder:text-primary-400 px-3 py-1.5 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
              id="email"
              placeholder="Your email..."
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rounded-md border border-border h-10 text-sm text-primary-900 placeholder:text-primary-400 px-3 py-1.5 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
              placeholder="Your email..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
