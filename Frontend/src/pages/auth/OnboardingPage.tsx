import { Link } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'

export function OnboardingPage() {
  return (
    <AuthLayout>
      <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)', textAlign: 'center', marginBottom: 'var(--space-2)', letterSpacing: 'var(--tracking-tight)' }}>
        Bem-vindo ao StreamHub
      </h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        Crie sua conta e unifique seus analytics
      </p>
      <Button variant="primary" size="md" fullWidth>
        Criar conta grátis
      </Button>
      <p style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        Já tem conta?{' '}
        <Link to={ROUTES.LOGIN} style={{ color: 'var(--color-text-brand)', fontWeight: 'var(--weight-medium)' }}>
          Entrar
        </Link>
      </p>
    </AuthLayout>
  )
}
