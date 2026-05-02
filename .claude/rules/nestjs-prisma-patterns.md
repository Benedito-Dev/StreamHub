# Padroes NestJS + Prisma (OPCIONAL)

**Aplicavel APENAS a projetos NestJS com Prisma ORM.**

**Para ativar:** adicione `nestjs-prisma-patterns` no frontmatter dos agents Implementer e Reviewer (em `.claude/agents/*.md`).

Se seu projeto **nao** usa NestJS+Prisma: ignore este skill ou delete o arquivo.

---

## 1. PRISMA SERVICE (nunca DatabaseService)

```typescript
import { PrismaService } from '../prisma.service';

@Injectable()
export class MyService {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: bigint) {
    return this.prisma.user.findFirst({
      where: { id, deleted: false }
    });
  }
}
```

---

## 2. BIGINT PARA IDs (se schema usa BigInt)

```typescript
// Schema Prisma
model User {
  id BigInt @id @default(autoincrement())
}

// Service
const id = BigInt(req.params.id);
const user = await this.prisma.user.findFirst({ where: { id } });
```

---

## 3. TRANSACTIONS EM MULTI-TABELA

```typescript
await this.prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  await tx.profile.create({
    data: { userId: user.id, ...profileData }
  });
  return user;
});
```

---

## 4. INCLUDE PARA EVITAR N+1

```typescript
// CORRETO — 1 query com JOIN
const users = await this.prisma.user.findMany({
  include: {
    posts: { select: { id: true, title: true } },
    profile: true,
  }
});

// ERRADO — N+1
const users = await this.prisma.user.findMany();
for (const user of users) {
  user.posts = await this.prisma.post.findMany({ where: { userId: user.id } });
}
```

---

## 5. DECIMAL PARA VALORES MONETARIOS

```typescript
// Schema
model Product {
  price Decimal @db.Decimal(19, 4)
}

// Service
import { Decimal } from '@prisma/client/runtime/library';

const price = new Decimal('99.99');
const total = price.times(quantity).plus(tax);

// Response DTO — converta para number ou string formatada
return { price: parseFloat(product.price.toFixed(2)) };
```

---

## 6. DTOs COM CLASS-VALIDATOR + SWAGGER

```typescript
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Joao Silva', minLength: 1, maxLength: 100 })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({ example: '11999998888' })
  @IsOptional()
  @IsString()
  phone?: string;
}
```

---

## 7. CONTROLLER LIMPO

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuario' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Dados invalidos' })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);  // so orquestra
  }
}
```

**Controller NAO deve:**
- Acessar Prisma direto (use service)
- Ter logica de negocio
- Fazer calculos complexos

---

## 8. SERVICE COM LOGGER

```typescript
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.debug(`Creating user with email ${dto.email}`);

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });

    if (existing) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }

    const user = await this.prisma.user.create({ data: dto });
    this.logger.log(`User ${user.id} created`);

    return this.toDto(user);
  }

  private toDto(user: User): UserResponseDto { ... }
}
```

---

## 9. GUARDS E AUTH

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)  // requer auth
export class UsersController {

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')  // so admin
  async findAll() { ... }

  @Get('me')
  async me(@CurrentUser() user: User) {  // decorator customizado
    return user;
  }
}
```

---

## 10. CURSOR PAGINATION

```typescript
async list(cursor?: string, limit = 20) {
  return this.prisma.user.findMany({
    ...(cursor ? {
      cursor: { id: BigInt(cursor) },
      skip: 1  // pula o proprio cursor
    } : {}),
    take: limit,
    orderBy: { id: 'asc' },
    select: { id: true, name: true, email: true }  // so o necessario
  });
}
```

---

## 11. MIGRATIONS SEGURAS

```bash
# CORRETO — cria migration SQL revisavel
npx prisma migrate dev --name add_user_phone

# PROIBIDO (bloqueado por hook)
npx prisma migrate reset          # apaga TUDO
npx prisma db push --accept-data-loss  # pode perder dados
```

Para renomear coluna sem perda de dados:
```bash
# 1. Crie migration manual (nao dev)
npx prisma migrate dev --create-only --name rename_column

# 2. Edite SQL para ALTER TABLE ... RENAME COLUMN
# 3. Aplique
npx prisma migrate dev
```

---

## 12. STRUCTURE MODULAR

```
src/
  users/
    dto/
      create-user.dto.ts
      update-user.dto.ts
      user-response.dto.ts
    users.controller.ts
    users.service.ts
    users.module.ts
  auth/
    ...
  common/
    timezone.service.ts
    constants.ts
    decorators/
    guards/
    filters/
  prisma.service.ts
  app.module.ts
  main.ts
```

Cada modulo: controller + service + module + DTOs. Module exporta service se outros modulos precisarem.
