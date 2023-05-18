import { request } from '@skzz-platform/shared/fetch/platform'
import { Pagination } from '@skzz-platform/shared'
import { QueryRData } from '@vunk/skzz'
import { CForm, FIRS } from './types'
import { FROM_DATA } from './const'
import { RestFetchOp } from '@vunk/skzz/shared/utils-fetch'
import { rBtns } from '@skzz-platform/api/basic'
/**
 * https://www.apifox.cn/link/project/2475837/apis/api-75968085  查询列表
 * @param pagination 
 * @param data 
 * @returns 
 */
export const rFormList = (pagination?: Pagination, formName?: Partial<CForm>['formName']) => {
  return request<[QueryRData<any>]>({
    method: 'POST',
    url: '/core/busi/query',
    data: {
      'datasetIds': ['1'],
      'condition': {
        '1': {
          formName,
          ...(pagination ? { pagination } : {}),
        },
      },
      ...FROM_DATA,
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas[0]
  })
}

export const rFormBtns = () => {
  return rBtns(FROM_DATA)
}

/**
 * https://www.apifox.cn/link/project/2475837/apis/api-76139037 查询详情
 * @param id 
 * @returns 
 */
export const rFormDetail = (id: string) => {
  return request<{
    '3.1': {
      form: Required<CForm>['form'],
      formName: CForm['formName'],
    }
  }>({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '3',
      'condition': {
        'id': id,
        'op': 'CustomizedForm',
      },
      ...FROM_DATA,
      'buttonId': 'search',
    },
  }).then(res => {
    return res.datas['3.1']
  })
}

/**
 *  https://www.apifox.cn/link/project/2475837/apis/api-75979863 新增
 *  https://www.apifox.cn/link/project/2475837/apis/api-76107660 修改
 * @param firs 
 * @param formName
 * @param id
 */
export const cuForm = (form: FIRS[], formName: string, id?: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      datasetId: '2',
      datas: [
        {
          datasetId: '1',
          rows: [
            {
              formName,
              op: id ? RestFetchOp.u : RestFetchOp.c,
              id,
            },
          ],
        },
      ],
      condition: {
        datasetId: '2',
        rows: [
          {
            form,
          },
        ],
      },
      ...FROM_DATA,
      'buttonId': 'increase',
    },
  }, {
    msg: id ? '修改成功！' : '新增成功！',
  })
}


/**
 * https://www.apifox.cn/link/project/2475837/apis/api-76233834 删除
 * @param id 
 * @returns 
 */
export const dForm = (id: string) => {
  return request({
    method: 'POST',
    url: '/core/busi/exec',
    data: {
      'datasetId': '4',
      datas: [
        {
          'datasetId': '1',
          'rows': [
            {
              'id': id,
              'op': RestFetchOp.d,
            },
          ],
        },
      ],
      ...FROM_DATA,
      'buttonId': 'remove',
    },
  }, {
    msg: '删除成功！',
  })
}
export * from './types'