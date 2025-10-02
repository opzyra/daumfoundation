import type { ProductForm } from './productForm';
import type { RentalDocumentDto } from './rentalDocumentDto';
import type { RentalDtoProduct } from './rentalDtoProduct';
import type { RentalDtoStatus } from './rentalDtoStatus';
import type { UserDto } from './userDto';

export interface RentalDto {
  /** PK */
  id: number;
  /** 대여 번호 8자리 */
  rentalNo: number;
  /** 상태 */
  status: RentalDtoStatus;
  /** 대여 희망 기간 */
  period: number;
  /** 승인 대여 기간 */
  confirmPeriod: number;
  /** 선택 옵션 */
  form?: ProductForm[];
  /** 신청 사유 */
  purpose: string;
  /** 대상자 이름 */
  name: string;
  /** 대상자 생년월일 */
  birth: string;
  /** 대상자 성별 */
  gender: string;
  /** 대상자 연락처 */
  phone: string;
  /** 대상자 도로명 주소 */
  roadAddress: string;
  /** 대상자 상세 주소 */
  moreAddress: string;
  /** 대상자 우편 번호 */
  zoneCode: string;
  /** NHS 검사 결과 */
  nhs: string;
  /** 조산아 여부 */
  preterm: boolean;
  /** 돌연변이 질병 */
  mutationDisease: string;
  /** 복합장애 */
  nestObstacle: string;
  /** 보호자명 */
  protectorName: string;
  /** 이용자와의 관계 */
  protectorRelation: string;
  /** 보호자 생년월일 */
  protectorBirth: string;
  /** 보호자 연락처 */
  protectorPhone: string;
  /** 보호자 도로명 주소 */
  protectorRoadAddress: string;
  /** 보호자 상세 주소 */
  protectorMoreAddress: string;
  /** 보호자 우편 번호 */
  protectorZoneCode: string;
  /** 내원중인 병원 이용 여부 */
  hospital: boolean;
  /** 내원중인 병원 */
  hospitalName: string;
  /** 주치의명 */
  hospitalDoctor: string;
  /** 내원 예정 병원 이름 */
  hospitalPlanName: string;
  /** 병원 추천 희망 */
  hospitalRecommend: boolean;
  /** 보청기 센터 이용여부 */
  hearingCenter: boolean;
  /** 보청기 센터명 */
  hearingCenterName: string;
  /** 내원 예정 보청기 센터 이름 */
  hearingCenterPlanName: string;
  /** 보청기 센터 추천 희망 */
  hearingCenterRecommend: boolean;
  /** 언어치료 센터 이용여부 */
  therapyCenter: boolean;
  /** 언어치료 센터명 */
  therapyCenterName: string;
  /** 내원 예정 언어치료 센터 이름 */
  therapyCenterPlanName: string;
  /** 언어치료 센터 추천 희망 */
  therapyCenterRecommend: boolean;
  /** 등록 장애인 여부 */
  registered: boolean;
  /** 홍보 및 마케팅 동의 */
  marketing: boolean;
  /** 사전 IT-MAIS 검사 결과 */
  beforeItMais: string;
  /** 사전 CAP 검사 결과 */
  beforeCap: string;
  /** 사전 SIR 검사 결과 */
  beforeSir: string;
  /** 사전 부모 양육 태도 결과 */
  beforeParentingAttitude: string;
  /** 사후 IT-MAIS 검사 결과 */
  afterItMais: string;
  /** 사후 CAP 검사 결과 */
  afterCap: string;
  /** 사후 SIR 검사 결과 */
  afterSir: string;
  /** 사후 부모 양육 태도 결과 */
  afterParentingAttitude: string;
  /** 복지카드 */
  welfareCard?: RentalDocumentDto[];
  /** 신분증 */
  residentCard?: RentalDocumentDto[];
  /** 청력검사 결과지 */
  hearingTest?: RentalDocumentDto[];
  /** 가족관계 증명서 */
  familyCertificate?: RentalDocumentDto[];
  /** 취약계층 증빙서류 */
  vulnerableProof?: RentalDocumentDto[];
  /** 수리불가 판정서 */
  unrepairableCertificate?: RentalDocumentDto[];
  /** 분실신고 증빙서류 */
  lossReport?: RentalDocumentDto[];
  /** 제품 이미지 */
  productImage: string;
  /** 제품 브랜드 */
  productBrand: string;
  /** 제품명 */
  productName: string;
  /** 제품 PK */
  productId: number;
  /**
   * 제품
   * @nullable
   */
  product: RentalDtoProduct;
  /** 회원 PK */
  userId: number;
  /** 회원 */
  user?: UserDto;
  /** 심사 승인 일시 */
  confirmAt?: string;
  /** 반납 예정 일시 */
  handoverAt?: string;
  /** 대여 종료 일시 */
  terminateAt?: string;
  /** 등록 일시 */
  createdAt?: string;
}
