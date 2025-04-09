import { AuthForm } from "./auth-form";


export
  function AuthPage(

) {
  return (
    <div className="flex flex-col justify-center">
      <h2
        className="
          mt-6
          text-center
          text-2xl
          font-bold
          tracking-tight
          text-emerald-700
        "
      >
        Войдите в свой аккаунт
      </h2>
      <AuthForm />
    </div>
  )
}
