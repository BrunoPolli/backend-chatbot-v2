import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  async create(@Body() questionData: {question: string, startedAt: string, status: string}): Promise<Question>
  {
    const { question, startedAt, status } = questionData
    return this.questionsService.create({question, startedAt, status});
  }

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Question> {
    return this.questionsService.findOne({id: id});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body()
    questionData: { question: string, startedAt: string, status: string }): Promise<Question> {
      const { question, startedAt, status } = questionData
      return this.questionsService.update({
        where: { id: id },
        data: { question, startedAt, status }
      });
    } 
  

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Question> {
    return this.questionsService.remove({id: id});
  }
}
