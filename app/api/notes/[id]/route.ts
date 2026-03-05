import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const res = await api(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data);
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data);
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const body = await request.json();

    const res = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data);
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}