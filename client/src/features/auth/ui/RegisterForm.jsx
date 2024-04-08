import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from 'shared/api/auth/authApi'
import { Button, PasswordField, Field } from 'shared/ui'
import styles from './auth.module.css'

export const RegisterForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [signUp, { isLoading, error, isError }] = useSignUpMutation()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm()

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
							required: 'Password is required',
							minLength: { value: 8, message: 'Min length 8' }
						}}
					/>
				</div>
				<div className={styles.formItem}>
					<PasswordField
						id='confirmPassword'
						name='confirmPassword'
						label='Confirm Password'
						errors={errors?.confirmPassword}
						register={register}
						rules={{
							required: 'Please confirm your password',
							pattern: {
								value: watch('password') !== watch('confirmPassword'),
								message: 'No match'
							}
						}}
					/>
				</div>
				<div className={styles.formItem}>
					<Button type='submit'>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
				</div>
			</form>
		</div>
	)
}
