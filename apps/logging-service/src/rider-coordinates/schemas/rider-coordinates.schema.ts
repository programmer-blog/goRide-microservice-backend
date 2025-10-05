import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RiderCoordinatesDocument = HydratedDocument<RiderCoordinate>;

@Schema({ timestamps: true })
export class RiderCoordinate {
  @Prop({ required: true })
  rider: number;
  @Prop({ required: true })
  lat: number;
  @Prop({ required: true })
  lng: number;
}

export const RiderCoordinatesSchema =
  SchemaFactory.createForClass(RiderCoordinate);
