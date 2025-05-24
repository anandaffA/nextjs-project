export default function CheckEmailPage() {
  return (
    <div className="min-h-screen font-garamond flex flex-col items-center justify-center bg-forest-mist px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-forest-bark">
          Confirmation Sent
        </h1>
        <p className="text-forest-bark text-base md:text-lg">
          Please check your email and click the confirmation link to activate
          your account.
        </p>
        <div className="flex justify-center">
          <svg
            className="w-24 h-24 text-forest-moss"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0L12 13.5 2.25 6.75"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500">
          Didnt receive the email? Check your spam folder or try signing up
          again.
        </p>
      </div>
    </div>
  );
}
