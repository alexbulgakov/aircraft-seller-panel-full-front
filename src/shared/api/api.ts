import { baseUrl } from './baseUrl'

interface Product {
  id: number
  name: string
  supplierEmail?: string
  count?: number
  price?: number
}

interface ApiResponse {
  success: boolean
}

interface ApiResponseWithId {
  id: number
}

class Api {
  private _baseUrl: string

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
  }

  private _getRes<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error('Download error')
    }
    return res.json() as Promise<T>
  }

  public getAllProducts(): Promise<Product[]> {
    return this.getItems<Product[]>('products/getAll')
  }

  public getProduct(id: number): Promise<Product> {
    return this.getItems<Product>(`products/get?id=${id}`)
  }

  public addProduct(product: Product): Promise<ApiResponseWithId> {
    return fetch(`${this._baseUrl}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then(res => this._getRes<ApiResponseWithId>(res))
  }

  public editProduct(product: Product): Promise<ApiResponse> {
    return fetch(`${this._baseUrl}/products/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then(res => this._getRes<ApiResponse>(res))
  }

  public deleteProduct(id: number): Promise<ApiResponse> {
    return fetch(`${this._baseUrl}/products/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(res => this._getRes<ApiResponse>(res))
  }

  public getItems<T>(url: string): Promise<T> {
    return fetch(`${this._baseUrl}/${url}`).then(res => this._getRes<T>(res))
  }
}

export const api = new Api(baseUrl)
