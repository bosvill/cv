import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'shared/api/auth/authApi'
import { Button, Field, PasswordField } from 'shared/ui'
import styles from './auth.module.css'

export const LoginForm = () => {
	const navigate = useNavigate()
	const [login, { isLoading, isError, error }] = useLoginMutation()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		try {
			const res = await login(data).unwrap()

			if (!res) {
				throw new Error('Login failed!')
			}

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
						id='email'
						name='email'
						type='text'
						label='Email'
						errors={errors?.email}
						register={register}
						rules={{
							required: 'Email is required',
							pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' }
						}}
					/>
				</div>
				<div className={styles.formItem}>
					<PasswordField
						id='password'
						name='password'
						label='Password'
						errors={errors?.password}
						register={register}
						rules={{
							required: 'Password is required'
						}}
					/>
				</div>

				<div className={styles.formItem}>
					<Button type='submit'>{isLoading ? 'Loading...' : 'Sign In'}</Button>
				</div>
			</form>
		</div>
	)
}
