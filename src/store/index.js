import { create } from 'zustand';

export const useStore = create((set) => ({
  data: [],
  createData: (param) => set((state) => ({
    data: [
      ...state.data,
      param
    ]
  })),
  deleteData: (param) => set((state) => (
    {
      data: state.data.filter(item => item.email !== param)
    }
  )),
  updateData: (param) => set((state) => ({
    data: param
  }))
}));