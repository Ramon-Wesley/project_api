import { ZodSchema, z } from "zod";
import Entity from "../../entity/Entity";
import ObjectValue from "../../object-value/ObjectValue";

export class GenericZodValidator<T extends Entity | ObjectValue> {
  genericValidate(entity: T, schema: ZodSchema, entityName: string): void {
    const result = schema.safeParse(entity);

    if (!result.success) {
      result.error.issues.forEach((res) => {
        entity.getNotification().insertErrors({
          context: entityName,
          field: res.path.join("."), 
          message: res.message,
        });
      });
    }
  }
}
