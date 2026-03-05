import { cookies } from "next/headers";
import { ApiError } from "@/lib/api/clientApi";
import { NextResponse } from "next/server";
import { api } from "../../api";

export async function GET() {
  const cookieStore = cookies(); // bez await

  try {
    const { data } = await api.get("/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.status ?? 500 } // domyślnie 500, jeśli brak status
    );
  }
}