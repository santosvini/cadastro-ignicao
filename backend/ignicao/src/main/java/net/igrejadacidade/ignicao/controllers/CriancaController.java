package net.igrejadacidade.ignicao.controllers;

import net.igrejadacidade.ignicao.model.CriancaModel;
import net.igrejadacidade.ignicao.repository.CriancaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CriancaController {
    @Autowired
    private CriancaRepository criancaRepository;

    /* MÉTODO PARA SALVAR CRIANÇA */

    @PostMapping(value = "salvarCrianca")
    @ResponseBody
    public ResponseEntity<CriancaModel> salvar(@RequestBody CriancaModel criancaModel) {

        CriancaModel crianca = criancaRepository.save(criancaModel);

        return new ResponseEntity<CriancaModel>(crianca, HttpStatus.CREATED);
    }

    /* MÉTODO PARA ATUALIZAR CRIANÇA */

    @PutMapping(value = "atualizarCrianca")
    @ResponseBody
    public ResponseEntity<?> atualizar(@RequestBody CriancaModel criancaModel) {

        if(criancaModel.getIdCrianca() == 0) {
            return new ResponseEntity<String>("O ID do cadastro não foi informado para a atualização!", HttpStatus.OK);
        }

        CriancaModel crianca = criancaRepository.saveAndFlush(criancaModel);

        return new ResponseEntity<CriancaModel>(crianca, HttpStatus.OK);
    }

    /* MÉTODO PARA APAGAR CRIANÇA */

    @DeleteMapping(value = "apagarCrianca")
    @ResponseBody
    public ResponseEntity<String> delete(@RequestParam Long idCrianca) {

        criancaRepository.deleteById(idCrianca);

        return new ResponseEntity<String>("Registro excluído com sucesso!", HttpStatus.OK);
    }

    /* MÉTODO PARA PESQUISAR ID */

    @GetMapping(value = "pesquisarCriancaPorCodigo")
    @ResponseBody
    public ResponseEntity<CriancaModel> pesquisarcriancaporcodigo(@RequestParam(name = "idCrianca") Long idCrianca) {

        CriancaModel crianca = criancaRepository.findById(idCrianca).get();

        return new ResponseEntity<CriancaModel>(crianca, HttpStatus.OK);
    }

    /* MÉTODO PARA LISTAR TODOS OS REGISTROS */

    @GetMapping(value = "listarCriancas")
    @ResponseBody
    public ResponseEntity<List<CriancaModel>> listaCrianca() {

        List<CriancaModel> criancas = criancaRepository.findAll();

        return new ResponseEntity<List<CriancaModel>>(criancas, HttpStatus.OK);

    }

    /* MÉTODO PARA PESQUISAR POR NOME */

    @GetMapping(value = "pesquisarPorNome")
    @ResponseBody
    public ResponseEntity<List<CriancaModel>> pesquisarpornome(@RequestParam(name = "nome") String nome) {

        List<CriancaModel> criancaModel = criancaRepository.buscarPorNome(nome.trim().toUpperCase());

        return new ResponseEntity<List<CriancaModel>>(criancaModel, HttpStatus.OK);
    }
}
