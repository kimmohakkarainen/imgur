package fi.exadeci.infrakit.repository;

import org.springframework.data.repository.CrudRepository;

import fi.exadeci.infrakit.domain.Metadata;

public interface MetadataRepository extends CrudRepository<Metadata, Long> {

}
