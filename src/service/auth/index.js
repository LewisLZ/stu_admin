import * as R from 'ramda'
import Cookies from 'js-cookie'

export const allDepartmentTp = {
  ceo_ffice: {
    value: 1,
    text: '总裁办'
  },
  amb: {
    value: 2,
    text: '阿米巴'
  },
  operation: {
    value: 3,
    text: '运营部'
  },
  marketing: {
    value: 4,
    text: '营销部'
  },
  Finance: {
    value: 5,
    text: '财务部'
  },
  Warehousing: {
    value: 6,
    text: '仓储部'
  },
  mei_shi: {
    value: 7,
    text: '美市诚品'
  }
}

export const allUserStatus = {
  all: {
    value: 0,
    text: '全部'
  },
  normal: {
    value: 1,
    text: '正常'
  },
  cancellation: {
    value: 2,
    text: '注销'
  }
}

export const allRoleTp = {
  all: {
    value: 0,
    text: '全部'
  },
  buyer: {
    value: 2,
    text: '采购员'
  },
  check: {
    value: 3,
    text: '选品审核'
  },
  purchasingLeader: {
    value: 4,
    text: '采购组长'
  },
  purchasingAssistant: {
    value: 5,
    text: '采购助理'
  },
  purchasingDirector: {
    value: 6,
    text: '采购总监'
  },
  legalAffairs: {
    value: 7,
    text: '风控'
  },
  marketingDirector: {
    value: 8,
    text: '营销部'
  },
  amoebaAssistant: {
    value: 9,
    text: '阿米巴助理'
  },
  president: {
    value: 10,
    text: '总裁'
  },
  finance: {
    value: 11,
    text: '税率审核'
  },
  cashier: {
    value: 12,
    text: '出纳'
  },
  operator: {
    value: 13,
    text: '单品资料审核'
  },
  Lawyer: {
    value: 14,
    text: '律师'
  },
  WarehouseConfirm: {
    value: 15,
    text: '仓库确认'
  },
  ReconciliationGroup: {
    value: 16,
    text: '对帐组'
  },
  SupplierReview: {
    value: 17,
    text: '供应商审核'
  },
  CrossSupplyChainManagement: {
    value: 18,
    text: '跨供应链管理'
  },
  BuyerYB: {
    value: 19,
    text: '采购员(亿宝)'
  },
  SupplierReviewYB: {
    value: 20,
    text: '供应商审核(亿宝)'
  },
  SelectionReviewYB: {
    value: 21,
    text: '选品审核(亿宝)'
  },
  BillConfirmation: {
    value: 28,
    text: '账单确认'
  },
  BillApproval: {
    value: 29,
    text: '账单审核'
  }
}

export const approvalRoleTp = {
  purchasingDirector: {
    value: 6,
    text: '采购总监'
  }
}

export const approvalContractRoleTp = {
  president: {
    value: 10,
    text: '总裁'
  }
}

export const filterParentGroup = (model) => {
  return R.filter(item => {
    return !item.auth || item.auth.length <= 0
  })(model || [])
}

export const clearAuthCookie = () => {
  try {
    Cookies.remove('web-session', { path: '/' })
  } catch (e) {
    console.log('clear cookie fail')
  }
}
