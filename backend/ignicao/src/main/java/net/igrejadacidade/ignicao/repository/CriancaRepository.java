package net.igrejadacidade.ignicao.repository;

import net.igrejadacidade.ignicao.model.CriancaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriancaRepository extends JpaRepository<CriancaModel, Long> {

    @Query(value = "select u from CriancaModel u where upper(trim(u.nome)) like %?1%")
    List<CriancaModel> buscarPorNome(String nome);
}