import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
    BadRequestException,
} from '@nestjs/common';

import { PaginationDto } from 'src/@core/domain/basic/irepository';
import { CreateEntryMovementUseCase } from 'src/@core/usecases/stock_movement/create-entry-stock-movement';
import { CreateExitMovementUseCase } from 'src/@core/usecases/stock_movement/create-exit-stock-movement';
import { GetStockMovementByIdUseCase } from 'src/@core/usecases/stock_movement/get-ById-stock-movement';
import { GetStockMovementsUseCase } from 'src/@core/usecases/stock_movement/get-stock-movements';
import { StockMovementDto } from './dtos/stock_movement.dto';



@Controller('stock-movements')
export class StockMovementController {

    constructor(

        @Inject('CreateEntryMovementUseCase')
        private readonly createStockEntryUseCase: CreateEntryMovementUseCase,

        @Inject('CreateExitMovementUseCase')
        private readonly createStockOutputUseCase: CreateExitMovementUseCase,

        @Inject('GetStockMovementsUseCase')
        private readonly getStockMovementsUseCase: GetStockMovementsUseCase,

        @Inject('GetStockMovementByIdUseCase')
        private readonly getStockMovementByIdUseCase: GetStockMovementByIdUseCase,

    ) { }

    @Post('entry')
    async createEntry(@Body() dto: StockMovementDto,) {
        try {

            return await this.createStockEntryUseCase.execute( dto,);

        } catch (error: any) {

            throw new BadRequestException( error.message);
        }
    }

    @Post('output')
    async createOutput( @Body() dto: StockMovementDto,) {
        try {

            return await this.createStockOutputUseCase.execute( dto,);

        } catch (error: any) {

            throw new BadRequestException( error.message,);
        }
    }

    @Get()
    async getAll( @Query() query: PaginationDto,) {

        return await this.getStockMovementsUseCase.execute(query,);
    }

    @Get(':id')
    async getById(@Param('id') id: string,) {

        return await this.getStockMovementByIdUseCase.execute(id,);
    }
}