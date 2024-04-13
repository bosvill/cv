import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'shared/api/auth/authApi'
import { Button, Field, PasswordField } from 'shared/ui'
import { loginSchema } from '../model/authSchema'
import styles from './auth.module.css'

export const LoginForm = () => {
	const navigate = useNavigate()
	const [login, { isLoading, isError, error }] = useLoginMutation()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = async data => {
		try {
			await login(data).unwrap()
			navigate('/user')
		} catch (err) {
			return err
		}
	}

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Sign In</h1>
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formItem}>
					<Field
						autoFocus
						id='mail'
						name='email'
						label='Email'
						error={errors?.email}
						register={register}
					/>
				</div>
				<div className={styles.formItem}>
					<PasswordField
						id='pwd'
						name='password'
						label='Password'
						error={errors?.password}
						register={register}
					/>
				</div>

				<div className={styles.formItem}>
					<Button type='submit'>{isLoading ? 'Loading...' : 'Sign In'}</Button>
				</div>
			</form>
		</div>
	)
}
