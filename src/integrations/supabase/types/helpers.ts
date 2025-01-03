import { Database } from "./database";

type PublicSchema = Database["public"];

export type Tables<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][PublicTableNameOrOptions]["Row"];

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][PublicTableNameOrOptions]["Insert"];

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][PublicTableNameOrOptions]["Update"];