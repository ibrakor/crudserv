export interface AkatsukiResponse {
  akatsuki: AkatsukiMember[];
  currentPage: number;
  pageSize: number;
  totalMember: number;
}

export interface AkatsukiMember {
  id: number;
  name: string;
  role: string;
  images: string[],
  mostrarImagen: boolean
}
