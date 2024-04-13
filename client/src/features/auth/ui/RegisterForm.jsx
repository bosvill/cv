import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { useSignUpMutation } from 'shared/api/auth/authApi'
import { Button, PasswordField, Field } from 'shared/ui'
import { registerSchema } from '../model/authSchema'
import styles from './auth.module.css'

export const RegisterForm = () => {
	const navigate = useNavigate()

	const [signUp, { isLoading, error, isError }] = useSignUpMutation()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm({ resolver: zodResolver(registerSchema) })

	const onSignup = async data => {
		try {
			await signUp(data).unwrap()
			navigate('/profile')
		} catch (err) {
			return err
		}
	}

	return (
		<div className={styles.content}>
			<h1 className={styles.title}>Registration</h1>
			{isError && <p className={styles.error}>{error.data?.message}</p>}
			<form onSubmit={handleSubmit(onSignup)}>
				<div className={styles.formItem}>
					<Field
						autoFocus
						id='email'
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
					<PasswordField
						id='confirmPwd'
						name='confirmPassword'
						label='Confirm Password'
						error={errors?.confirmPassword}
						register={register}
					/>
				</div>
				<div className={styles.formItem}>
					<Button type='submit'>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
				</div>
			</form>
		</div>
	)
}
