import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await this.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (err) {
            if (err.errno === 1062) {
                throw new ConflictException('Username already exists');
            }
            throw new InternalServerErrorException();
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        return null;
    }

    private async genSalt(): Promise<string> {
        return bcrypt.genSalt();
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
