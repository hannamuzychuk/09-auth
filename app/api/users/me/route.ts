import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/users/me', {
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

    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.patch('/users/me', body, {
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

    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}