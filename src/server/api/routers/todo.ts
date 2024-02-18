import {
  createTaskSchema,
  deleteTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
} from "~/schema/todo";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          ...input,
          user: {
            // 既存の存在するレコードを関連付ける
            connect: {
              // ログインしているユーザのIdに一致するUserのレコード
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getSingleTask: protectedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.db.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),
  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      });
    }),
  deleteTask: protectedProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input.taskId },
      });
    }),
});
