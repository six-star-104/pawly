export interface UserSearchResponse {
  status: string;
  data: 
    {
      nickname: string;
      name:string;
      assets: string;
      memberId: number;
    }[];
  
  code: null | string;
  message: string;
}


export interface UserSearchResponseResult {
  status: string;
  data: {
    member: {
      nickname: string;
      assets: string;
    };
  };
  code: null | string;
  message: string;
}

export interface Member {
  nickname: string;
  assets: string;
}
