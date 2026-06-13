import { PaginationDto } from "../../domain/basic/irepository";
import { IUserRepository } from "../../domain/users/interfaces/iuserrepository";


export class GetUsersUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(query: PaginationDto) {
        const result = await this.userRepository.findPaginated(query);

        return {
            total: result.total,
            data: result.data.map(user => user.toJSON(),
            ),
        };
    }
}
