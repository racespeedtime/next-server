import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class PaginatePipe implements PipeTransform {
  constructor(
    private pageNum: number = 1,
    private pageSize: number = 10,
  ) {}

  transform(value: Record<string, any>) {
    const pageNum = +value.pageNum || this.pageNum
    const pageSize = +value.pageSize || this.pageSize
    return {
      ...value,
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }
  }
}
