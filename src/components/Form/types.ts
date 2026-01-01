export type FormState = {
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

export type FormErrors = {
    email?: string
    password?: string
    confirmPassword?: string
    acceptTerms?: string
}
