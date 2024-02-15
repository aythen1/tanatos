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

  @Column({ nullable: true })
  old_password: string | null; // Guarda la contraseña anterior si ha sido modificada

  @OneToMany(() => StoreFlorist, (store) => store.id, { nullable: true })
  store: StoreFlorist[];

  @OneToMany(() => Funeral, (funeral) => funeral.id, { nullable: true })
  esquela: Funeral[];

  @Column({ nullable: true })
  verificationCode: string; // Propiedad para almacenar el código de verificación

  @Column({ nullable: true })
  verificationCodeExpiration: Date; // Propiedad para almacenar la fecha de expiración del código de verificación
}
