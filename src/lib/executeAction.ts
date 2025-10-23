// import { getErrorMessage } from "@/lib/getErrorMessage";
// import { isRedirectError } from "next/dist/client/components/redirect-error";

// type Options<T> = {
//   actionFn: () => Promise<T>;
// };
// const executeAction = async <T>({ actionFn }: Options<T>) => {
//   try {
//     await actionFn();
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     throw new Error(getErrorMessage(error));
//   }
// };

// export { executeAction };

import { getErrorMessage } from "@/lib/getErrorMessage";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
};

// Add this if you’re using Prisma or server actions:
export const runtime = "nodejs";

export async function executeAction<T>({ actionFn }: Options<T>): Promise<T> {
  try {
    return await actionFn();
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;

    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = getErrorMessage?.(error) ?? "Something went wrong";
    }

    console.error("[executeAction]", message);
    throw new Error(message);
  }
}
