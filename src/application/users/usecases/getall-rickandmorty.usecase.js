/* eslint-disable no-undef */
import {RickAndMortyReportImplRepository} from "../../../infraestructure/users/repository/rickandmorty-report-impl.repository";

export class GetAllRickAndMortyUseCase{
    async execute(){
      var rickRepository = new RickAndMortyReportImplRepository();
      const result = await rickRepository.getAll();
      return result;
    }
}
  