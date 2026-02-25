import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './entities/exhibit.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { APP_CONSTANTS } from '../constants/constants';

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit) private exhibitsRepository: Repository<Exhibit>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(file: Express.Multer.File, description: string, userId: number, username: string): Promise<Exhibit> {
    const uploadPath = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadPath, uniqueFileName);
    
    fs.writeFileSync(filePath, file.buffer);

    const exhibit = this.exhibitsRepository.create({
      image: uniqueFileName,
      description,
      userId
    });
    
    const saved = await this.exhibitsRepository.save(exhibit);
    this.notificationsGateway.server.emit('newPost', { message: description, user: username });
    return saved;
  }

  async findAll(page: number, limit: number) {
    if (page < 1 || !page) page = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE;
    if (limit < 1 || !limit) limit = APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT;

    const [result, total] = await this.exhibitsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user', 'comments']
    });

    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findMyPosts(userId: number, page: number, limit: number) {
    if (page < 1 || !page) page = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE;
    if (limit < 1 || !limit) limit = APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT;

    const [result, total] = await this.exhibitsRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['comments']
    });

    return { data: result, total, page, lastPage: Math.ceil(total / limit) };
  }

  findOne(id: number) {
    return this.exhibitsRepository.findOne({ where: { id }, relations: ['user', 'comments'] });
  }

  async remove(id: number, userId: number): Promise<void> {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

    if (!exhibit) {
      throw new NotFoundException(`Exhibit with ID ${id} not found`);
    }

    if (exhibit.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this exhibit');
    }

    await this.exhibitsRepository.remove(exhibit);
    this.removeFile(exhibit.image);
  }

  private removeFile(fileName: string): void {
    const filePathToRemove = path.join(process.cwd(), 'uploads', fileName);
    if (fs.existsSync(filePathToRemove)) {
      fs.unlinkSync(filePathToRemove);
    }
  }
}