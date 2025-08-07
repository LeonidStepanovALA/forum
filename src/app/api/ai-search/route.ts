import { NextRequest, NextResponse } from 'next/server';
import { aiSearchService } from '@/services/aiSearchService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, context, filters, language } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Вызываем AI-сервис
    const response = await aiSearchService.search({
      query,
      context,
      filters,
      language
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const language = searchParams.get('lang') || 'ru';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    // Вызываем AI-сервис
    const response = await aiSearchService.search({
      query,
      language,
      context: 'eco-tourism'
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
