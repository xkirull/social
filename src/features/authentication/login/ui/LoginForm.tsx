import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from "react";
import css from "./LoginForm.module.css";
import { LoginFormSchema, loginFormSchema } from "../model/LoginFormShema";
import { loginThunk } from "../model/login";
import { useAppDispatch } from "shared/model/hooks";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const {
        setError,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    })

    const onSubmitHandler = useCallback(
        ({ email, password }: LoginFormSchema) => {
            dispatch(loginThunk({ email, password }))
                .unwrap()
                .then(() => console.log("Done"))
                .catch((error: { message: string; }) => {
                    setError('email', { type: 'server', message: error.message })
                })
        },
        []
    )

    return (
        <div className={css.root}>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={css.form}>
                <span>Вход</span>
                <div>
                    <input type="text" {...register('email')} placeholder="Почта" />
                    <div>{errors.email?.message}</div>
                    <input type="password" {...register('password')} placeholder="Пароль" />
                    {errors.password && (
                        <p className="text-xs">{errors.password?.message}</p>
                    )}
                    <input type="submit" value="Войти" />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
