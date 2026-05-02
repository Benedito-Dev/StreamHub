# JSDoc Templates (TypeScript)

Templates para documentar codigo TypeScript de forma consistente.

---

## 1. FUNCAO / METODO PUBLICO

```typescript
/**
 * Descricao curta em 1 linha.
 *
 * Descricao mais longa quando necessario — contexto, edge cases, invariantes.
 *
 * @param paramName - Descricao do parametro
 * @param options - Opcoes adicionais
 * @returns Descricao do retorno
 * @throws {NotFoundException} Quando entidade nao existe
 * @throws {ValidationException} Quando input e invalido
 *
 * @example
 * const user = await userService.findById('123');
 * console.log(user.name);
 */
async findById(id: string): Promise<User> { ... }
```

### Dica
- `@param` sem `@type` (o TypeScript ja tem os tipos)
- `@returns` obrigatorio se retorna algo nao-obvio
- `@throws` quando lanca excecao especifica
- `@example` muito util para metodos complexos

---

## 2. CLASSE / SERVICE

```typescript
/**
 * Gerencia operacoes de autenticacao.
 *
 * Responsabilidades:
 * - Login/logout com JWT
 * - Refresh token com rotacao
 * - Validacao de sessoes ativas
 *
 * @example
 * const auth = new AuthService(userRepo, jwtService);
 * const tokens = await auth.login({ email, password });
 */
@Injectable()
export class AuthService { ... }
```

---

## 3. DTO / INTERFACE / TYPE

```typescript
/**
 * Input para criar novo usuario.
 */
export class CreateUserDto {
  /** Email unico do usuario */
  @IsEmail()
  email: string;

  /** Nome completo (1-100 caracteres) */
  @IsString()
  @Length(1, 100)
  name: string;

  /** Senha em texto plano (sera hasheada antes de persistir) */
  @IsString()
  @MinLength(8)
  password: string;
}
```

---

## 4. CONTROLLER

```typescript
/**
 * Endpoints de autenticacao.
 */
@Controller('auth')
export class AuthController {
  /**
   * Login com email e senha.
   *
   * @returns Access + refresh tokens (JWT)
   * @throws {UnauthorizedException} Credenciais invalidas
   */
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> { ... }
}
```

---

## 5. ENUMS / CONSTANTS

```typescript
/**
 * Status possiveis de uma assinatura.
 */
export enum SubscriptionStatus {
  /** Assinatura ativa e paga em dia */
  ACTIVE = 'active',

  /** Pagamento atrasado (grace period de 7 dias) */
  PAST_DUE = 'past_due',

  /** Cancelada pelo usuario */
  CANCELED = 'canceled',

  /** Expirada apos periodo de graca */
  EXPIRED = 'expired',
}
```

---

## 6. TAGS UTEIS

| Tag | Uso |
|-----|-----|
| `@deprecated` | Metodo obsoleto; indicar alternativa |
| `@see` | Referencia a outro metodo/arquivo |
| `@internal` | Publico tecnicamente mas nao para API externa |
| `@remarks` | Notas adicionais apos o `@returns` |
| `@beta` | Feature experimental, pode mudar |

```typescript
/**
 * Busca usuario por ID.
 *
 * @deprecated Use `findOne({ id })` em vez disso.
 * @see findOne
 */
async findById(id: string): Promise<User> { ... }
```

---

## 7. EVITAR

### Redundancia com o codigo

```typescript
// RUIM — JSDoc so repete o que o codigo diz
/**
 * @param name - O nome
 * @param age - A idade
 */
function greet(name: string, age: number) { ... }
```

```typescript
// BOM — JSDoc adiciona contexto que codigo nao tem
/**
 * Formata saudacao personalizada.
 *
 * @param age - Idade em anos (decimal aceito para bebes <1 ano)
 */
function greet(name: string, age: number) { ... }
```

### JSDoc em tudo

Nao precisa documentar:
- Funcoes privadas obvias (`#helper`, `_format`)
- Getters triviais
- Funcoes de 1 linha com nome autoexplicativo

Documente **metodos publicos** e **logica nao-obvia**.

---

## 8. QUANDO DOCUMENTAR

- [ ] **SEMPRE:** Metodos publicos de services/controllers
- [ ] **SEMPRE:** Interfaces/DTOs de contrato externo
- [ ] **SEMPRE:** Funcoes com side effects importantes
- [ ] **SEMPRE:** Regras de negocio complexas
- [ ] **RECOMENDADO:** Utils que podem ser reusados
- [ ] **OPCIONAL:** Metodos privados (so se complexos)
- [ ] **EVITAR:** Getters, setters triviais, funcoes auto-explicativas
