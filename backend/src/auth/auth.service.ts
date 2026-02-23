import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, password } = signupDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        return this.generateToken(user.id, user.email, user.role);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            return this.generateToken(user.id, user.email, user.role);
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    private async generateToken(userId: number, email: string, role: string) {
        const payload = { sub: userId, email, role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
