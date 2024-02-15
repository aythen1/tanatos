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
import { StoreFlorist } from '../../store-florist/entities/store-florist.entity';
import { Funeral } from '../../funeral/entities/funeral.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(StoreFlorist)
    private readonly storeFloristRepository: Repository<StoreFlorist>,
    @InjectRepository(Funeral)
    private readonly funeralRepository: Repository<Funeral>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    store_id: number,
    esquela_id: number,
    client_id: number,
  ): Promise<Order> {
    const store = await this.storeFloristRepository.findOne({
      where: { id: store_id },
    });
    const esquela = await this.funeralRepository.findOne({
      where: { id: esquela_id },
    });
    const cliente = await this.usuarioRepository.findOne({
      where: { id: client_id },
    });
    console.log('store', store.name);
    if (!store) {
      throw new NotFoundException(`Store with id ${store_id} not found`);
    }
    if (!esquela) {
      throw new NotFoundException(`Esquela with id ${esquela_id} not found`);
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      store,
      esquela,
      cliente,
    });
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const orderId = parseInt(id, 10); // Convertir el ID a número
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['esquela', 'store', 'cliente'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    // if (order.status === 'completed') {
    //   throw new BadRequestException(
    //     `Order with id ${id} cannot be cancelled because its status is ${order.status}`,
    //   );
    // }

    // if (updateOrderDto.status === 'cancelled' && order.status !== 'pending') {
    //   throw new BadRequestException(
    //     `Order with id ${id} can only be cancelled if its status is pending`,
    //   );
    // }

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

  async findOrdersByStoreId(storeId: number, status: string): Promise<Order[]> {
    // Buscar todos los pedidos asociados al ID de la tienda florista
    let orders: Order[];

    if (status) {
      // Filtrar por estado si se proporciona
      orders = await this.orderRepository.find({
        where: { store: { id: storeId }, status: status },
        relations: ['store', 'esquela', 'cliente'], // Cargar las relaciones con la tienda, la esquela y el cliente
      });
    } else {
      // Si no se proporciona estado, buscar todos los pedidos sin filtrar por estado
      orders = await this.orderRepository.find({
        where: { store: { id: storeId } },
        relations: ['store', 'esquela', 'cliente'], // Cargar las relaciones con la tienda, la esquela y el cliente
      });
    }

    // Verificar si se encontraron pedidos
    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No se encontraron pedidos para la tienda con ID ${storeId}`,
      );
    }

    return orders;
  }
}
