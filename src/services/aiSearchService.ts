// AI Search Service - интеграция с внешними AI API

interface AISearchRequest {
  query: string;
  context?: string;
  filters?: any;
  language?: string;
}

interface AISearchResponse {
  suggestions: AISuggestion[];
  recommendations: AIRecommendation[];
  filters: AIFilter[];
  confidence: number;
  processingTime: number;
}

interface AISuggestion {
  id: string;
  text: string;
  type: 'search' | 'filter' | 'recommendation';
  confidence: number;
  category?: string;
  relevance: number;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  confidence: number;
  reasoning: string;
}

interface AIFilter {
  id: string;
  name: string;
  value: any;
  confidence: number;
  reasoning: string;
}

class AISearchService {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://api.openai.com/v1/chat/completions';
  private fallbackMode: boolean = true;
  private useInternalAPI: boolean = true;

  constructor() {
    // В продакшене здесь будет реальный API ключ
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || null;
  }

  // Основной метод AI-поиска
  async search(request: AISearchRequest): Promise<AISearchResponse> {
    try {
      if (this.useInternalAPI) {
        return await this.callInternalAPI(request);
      } else if (this.apiKey && !this.fallbackMode) {
        return await this.callOpenAI(request);
      } else {
        return await this.fallbackSearch(request);
      }
    } catch (error) {
      console.error('AI Search Error:', error);
      return await this.fallbackSearch(request);
    }
  }

  // Вызов внутреннего API-роута
  private async callInternalAPI(request: AISearchRequest): Promise<AISearchResponse> {
    const response = await fetch('/api/ai-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Internal API error: ${response.status}`);
    }

    return await response.json();
  }

  // Интеграция с OpenAI API
  private async callOpenAI(request: AISearchRequest): Promise<AISearchResponse> {
    const prompt = this.buildPrompt(request);
    
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Ты - AI-ассистент для эко-туризма. Анализируй запросы и давай релевантные рекомендации.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return this.parseOpenAIResponse(data, request);
  }

  // Fallback режим - локальная AI-логика
  private async fallbackSearch(request: AISearchRequest): Promise<AISearchResponse> {
    const startTime = Date.now();
    
    // Имитация обработки
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const suggestions: AISuggestion[] = [];
    const recommendations: AIRecommendation[] = [];
    const filters: AIFilter[] = [];

    const query = request.query.toLowerCase();

    // Анализ запроса и генерация подсказок
    if (query.includes('горы') || query.includes('mountain')) {
      suggestions.push({
        id: 'mountain-eco',
        text: 'Эко-туры в горы',
        type: 'search',
        confidence: 0.95,
        category: 'tour',
        relevance: 0.9
      });
      
      recommendations.push({
        id: 'mountain-recommendation',
        title: 'Горные эко-туры',
        description: 'Рекомендуем эко-туры в горы с минимальным воздействием на природу',
        category: 'tour',
        confidence: 0.95,
        reasoning: 'Запрос связан с горным туризмом'
      });
    }

    if (query.includes('питание') || query.includes('food') || query.includes('еда')) {
      suggestions.push({
        id: 'organic-food',
        text: 'Органические фермы',
        type: 'search',
        confidence: 0.88,
        category: 'food',
        relevance: 0.85
      });
      
      recommendations.push({
        id: 'food-recommendation',
        title: 'Органическое питание',
        description: 'Попробуйте органические фермы и эко-кафе',
        category: 'food',
        confidence: 0.88,
        reasoning: 'Запрос связан с питанием'
      });
    }

    if (query.includes('транспорт') || query.includes('transport') || query.includes('велосипед')) {
      suggestions.push({
        id: 'eco-transport',
        text: 'Электровелосипеды',
        type: 'search',
        confidence: 0.92,
        category: 'transport',
        relevance: 0.88
      });
      
      recommendations.push({
        id: 'transport-recommendation',
        title: 'Эко-транспорт',
        description: 'Выберите электровелосипеды или электромобили',
        category: 'transport',
        confidence: 0.92,
        reasoning: 'Запрос связан с транспортом'
      });
    }

    // Умные фильтры
    if (query.includes('дешево') || query.includes('бюджет') || query.includes('budget')) {
      filters.push({
        id: 'budget-filter',
        name: 'Ценовой диапазон',
        value: { min: 0, max: 50000 },
        confidence: 0.85,
        reasoning: 'Запрос указывает на бюджетные предпочтения'
      });
    }

    if (query.includes('люкс') || query.includes('luxury') || query.includes('премиум')) {
      filters.push({
        id: 'luxury-filter',
        name: 'Ценовой диапазон',
        value: { min: 500000, max: null },
        confidence: 0.87,
        reasoning: 'Запрос указывает на премиум предпочтения'
      });
    }

    if (query.includes('эко') || query.includes('eco')) {
      filters.push({
        id: 'eco-rating-filter',
        name: 'Эко-рейтинг',
        value: { min: 4 },
        confidence: 0.9,
        reasoning: 'Запрос связан с экологией'
      });
    }

    return {
      suggestions,
      recommendations,
      filters,
      confidence: suggestions.length > 0 ? suggestions[0].confidence : 0.5,
      processingTime: Date.now() - startTime
    };
  }

  // Построение промпта для OpenAI
  private buildPrompt(request: AISearchRequest): string {
    return `
Запрос пользователя: "${request.query}"
Контекст: Эко-туризм в Казахстане
Язык: ${request.language || 'ru'}

Пожалуйста, проанализируй запрос и предоставь:
1. Релевантные поисковые подсказки
2. AI-рекомендации для эко-туризма
3. Умные фильтры на основе запроса

Формат ответа должен быть в JSON:
{
  "suggestions": [
    {
      "id": "unique-id",
      "text": "текст подсказки",
      "type": "search",
      "confidence": 0.95,
      "category": "tour"
    }
  ],
  "recommendations": [
    {
      "id": "unique-id",
      "title": "Название рекомендации",
      "description": "Описание",
      "category": "tour",
      "confidence": 0.95,
      "reasoning": "Обоснование"
    }
  ],
  "filters": [
    {
      "id": "unique-id",
      "name": "Название фильтра",
      "value": "значение",
      "confidence": 0.85,
      "reasoning": "Обоснование"
    }
  ]
}
    `;
  }

  // Парсинг ответа от OpenAI
  private async parseOpenAIResponse(data: any, request: AISearchRequest): Promise<AISearchResponse> {
    try {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      
      return {
        suggestions: parsed.suggestions || [],
        recommendations: parsed.recommendations || [],
        filters: parsed.filters || [],
        confidence: 0.9,
        processingTime: Date.now()
      };
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return await this.fallbackSearch(request);
    }
  }

  // Анализ трендов поиска
  async analyzeTrends(queries: string[]): Promise<any> {
    // Здесь можно добавить анализ трендов
    return {
      popularQueries: queries.slice(0, 5),
      trendingCategories: ['Экотуризм', 'Органическое питание', 'Эко-транспорт'],
      searchVolume: queries.length
    };
  }

  // Персонализированные рекомендации
  async getPersonalizedRecommendations(userProfile: any): Promise<AIRecommendation[]> {
    // Здесь можно добавить персонализацию на основе профиля пользователя
    return [
      {
        id: 'personalized-1',
        title: 'Персональная рекомендация',
        description: 'Основана на ваших предпочтениях',
        category: 'tour',
        confidence: 0.85,
        reasoning: 'Анализ истории поиска'
      }
    ];
  }

  // Переключение режимов
  setUseInternalAPI(use: boolean) {
    this.useInternalAPI = use;
  }

  setFallbackMode(enabled: boolean) {
    this.fallbackMode = enabled;
  }
}

// Экспорт сервиса
export const aiSearchService = new AISearchService();
export type { AISearchRequest, AISearchResponse, AISuggestion, AIRecommendation, AIFilter };
