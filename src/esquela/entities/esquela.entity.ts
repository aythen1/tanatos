// src/entities/esquela.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('esquelas')
export class EsquelaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column()
  tanatorio: string;

  @Column({ nullable: false })
  direccion: string;

  @Column()
  fecha: string;

  @Column()
  hora: string;

  @Column()
  texto1: string;

  @Column()
  texto2: string;

  @Column()
  texto3: string;

  @Column()
  texto4: string;

  @Column()
  foto: string;

  @Column()
  link: string;

  @Column()
  documento: string;

  //   @ManyToMany(() => FloristeriaEntity)
  //   @JoinTable()
  //   floristerias: FloristeriaEntity[];
}
