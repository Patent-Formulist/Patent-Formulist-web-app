import { API_PATENT_ENDPOINTS } from '../apiConfig';
import authService from '../auth/authService';

class PatentService {
  async getUserPatents() {
    const response = await authService.authenticatedFetch(
      API_PATENT_ENDPOINTS.PATENT_GET_ALL,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );

    let rawBody;
    try {
      rawBody = await response.text();
    } catch {
      throw new Error('Ошибка получения данных');
    }

    let data;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Неверный формат идентификатора пользователя');
        case 404:
          throw new Error('Патенты не найдены или доступ запрещён');
        case 422:
          throw new Error('Неверный формат UUID');
        case 500:
          throw new Error('Внутренняя ошибка сервера');
        case 503:
          throw new Error('Сервис временно недоступен. Попробуйте позже.');
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка');
      }
    }

    if (data && typeof data.patents === 'object') {
      return Object.entries(data.patents).map(([id, patent]) => ({
        id,
        ...patent,
      }));
    }
    return [];
  }

  async getPatent(patentUuid) {
    const response = await authService.authenticatedFetch(
      API_PATENT_ENDPOINTS.PATENT_GET(patentUuid),
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );

    let rawBody;
    try {
      rawBody = await response.text();
    } catch {
      throw new Error('Ошибка получения данных');
    }

    let data;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Неверный формат идентификатора патента');
        case 404:
          throw new Error('Патент не найден или доступ запрещён');
        case 422:
          throw new Error('Неверный формат UUID');
        case 500:
          throw new Error('Внутренняя ошибка сервера');
        case 503:
          throw new Error('Сервис временно недоступен. Попробуйте позже.');
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка');
      }
    }

    return data;
  }

  async editPatent(patentUuid, patentData) {
    const response = await authService.authenticatedFetch(
      API_PATENT_ENDPOINTS.PATENT_UPDATE(patentUuid),
      {
        method: 'PUT',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(patentData),
      }
    );

    let rawBody;
    try {
      rawBody = await response.text();
    } catch {
      throw new Error('Ошибка получения данных');
    }

    let data;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Нет подходящих полей для обновления');
        case 403:
          throw new Error(
            'У пользователя нет прав на редактирование этого патента'
          );
        case 404:
          throw new Error('Патент не найден или доступ запрещён');
        case 422:
          throw new Error(
            'Неверные данные запроса: имя патента не может быть пустым'
          );
        case 500:
          throw new Error('Не удалось обновить патент в системе');
        case 503:
          throw new Error('Сервис хранения временно недоступен');
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка');
      }
    }

    return data;
  }

  async deletePatent(patentUuid) {
    const response = await authService.authenticatedFetch(
      API_PATENT_ENDPOINTS.PATENT_DELETE(patentUuid),
      {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      }
    );

    let rawBody;
    try {
      rawBody = await response.text();
    } catch {
      throw new Error('Ошибка получения данных');
    }

    let data;
    try {
      data = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      switch (response.status) {
        case 403:
          throw new Error(
            'У пользователя нет прав на удаление этого патента'
          );
        case 404:
          throw new Error('Патент не найден или доступ запрещён');
        case 422:
          throw new Error(
            'Неверные данные запроса: некорректный формат UUID'
          );
        case 500:
          throw new Error('Не удалось удалить патент из системы');
        case 503:
          throw new Error('Сервис хранения временно недоступен');
        default:
          throw new Error(data?.detail ?? 'Неизвестная ошибка');
      }
    }

    return data;
  }

  async createPatent(patentData) {
    const response = await authService.authenticatedFetch(
            API_PATENT_ENDPOINTS.PATENT_CREATE,
            {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: JSON.stringify(patentData)
            }
        );

        let rawBody;
        try {
            rawBody = await response.text();       
        } catch {
            throw new Error('Ошибка получения данных');
        }

        let data;
        try {
            data = rawBody ? JSON.parse(rawBody) : null;
        } catch {
            data = null;
        }

        if (!response.ok) {
            switch (response.status) {
            case 400:
                throw new Error('Неверный формат идентификатора пользователя');
            case 422:
                throw new Error('Неверные данные запроса: имя патента обязательно');
            case 500:
                throw new Error('Не удалось создать патент в системе');
            case 503:
                throw new Error('Сервис хранения временно недоступен');
            default:
                throw new Error(data?.detail ?? 'Неизвестная ошибка');
            }
        }

        return data;
    }
}

export default new PatentService();