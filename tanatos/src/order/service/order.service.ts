import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const orderId = parseInt(id, 10); // Convertir el ID a número
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === 'completed' || order.status === 'accepted') {
      throw new BadRequestException(
        `Order with id ${id} cannot be cancelled because its status is ${order.status}`,
      );
    }

    if (updateOrderDto.status === 'cancelled' && order.status !== 'pending') {
      throw new BadRequestException(
        `Order with id ${id} can only be cancelled if its status is pending`,
      );
    }

    order.status = updateOrderDto.status || order.status;
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async findByStatus(status: string): Promise<Order[]> {
    return await this.orderRepository.find({ where: { status } });
  }
}
