import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResultDto } from './dto-paginate/paginate.dto';

@Injectable()
export class PaginationService {
  async paginate<T>(
    repository: Repository<T>,
    page: number = 1,
    limit: number = 10,
    queryOptions: any = {}
  ): Promise<PaginatedResultDto<T>> {
    const [result, total] = await repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      ...queryOptions,
    });

    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
