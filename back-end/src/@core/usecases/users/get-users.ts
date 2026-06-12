import { PaginationDto } from "../../domain/basic/irepository";
import { IUserRepository } from "../../domain/users/interfaces/iuserrepository";


export class GetUsersUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(query: PaginationDto) {
        return this.userRepository.findPaginated(query);
    }
}