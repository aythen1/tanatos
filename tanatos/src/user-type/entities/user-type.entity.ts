import { Funeral } from 'src/funeral/entities/funeral.entity';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  photo: string | null;

  @Column()
  phone: string;

  @Column('decimal', { precision: 10, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lng: number;

  @Column({ type: 'date' })
  dob: string;

  @Column({ nullable: true })
  gender: string | null;

  @Column()
  user_type: string;

  @OneToMany(() => StoreFlorist, (store) => store.id, { nullable: true })
  store: StoreFlorist[];

  @OneToMany(() => Funeral, (funeral) => funeral.id, { nullable: true })
  esquela: Funeral[];
}
