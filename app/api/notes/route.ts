import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    const tag = rawTag === 'All' ? '' : rawTag;

    const res = await api('/notes', {
      params: {
        ...(search && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
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

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const body = await request.json();

    const res = await api.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
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