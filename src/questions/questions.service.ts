import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService){}
  
  async create(data: Prisma.QuestionCreateInput): Promise<Question>{
    return this.prisma.question.create({data})
  }

  async findAll(): Promise<Question[] | null> {
    return this.prisma.question.findMany();
  }

  async findOne(id: Prisma.QuestionWhereUniqueInput): Promise<Question | null> {
    return this.prisma.question.findUnique({where: id})
  }

  async update(params: {
    where: Prisma.QuestionWhereUniqueInput;
    data: Prisma.QuestionUpdateInput;
  }) {
    const { where, data } = params;
  return this.prisma.question.update({
    data,
    where
  })  
  }

  async remove(where: Prisma.QuestionWhereUniqueInput): Promise<Question> {
    return this.prisma.question.delete({where});
  }

}
