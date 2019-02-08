package fi.exadeci.infrakit.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fi.exadeci.infrakit.domain.Metadata;
import fi.exadeci.infrakit.domain.MetadataEntry;
import fi.exadeci.infrakit.repository.MetadataEntryRepository;
import fi.exadeci.infrakit.repository.MetadataRepository;

@RestController
public class MetadataController {

	@Autowired
	private MetadataRepository repo;

	@Autowired
	private MetadataEntryRepository entryRepo;

	@RequestMapping(path = "/rest/metadata/{id}", method = RequestMethod.GET) 
	public @ResponseBody Map<String, Object> getMetadata(@PathVariable long id) {

		Map<String, Object> retval = new HashMap<>();

		Metadata m = repo.findById(id).orElse(null);

		if(m != null) {
			retval.put("id", id);
			for(MetadataEntry entry : m.getEntries()) {
				if(entry.getStringValue() != null) {
					retval.put(entry.getKey(), entry.getStringValue());
				} else {
					retval.put(entry.getKey(), entry.getIntegerValue());
				}
			}
		}

		return retval;
	}


	@CrossOrigin(maxAge = 3600)
	@RequestMapping(path = "/rest/metadata", method = RequestMethod.POST) 
	public void getMetadata(@RequestBody Map<String, Object> request) { 

		String id = (String)request.get("id");

		if(id != null) {
			Metadata meta = Metadata.create(id);
			
			meta = repo.save(meta);

			for(Entry<String, Object> entry : request.entrySet()) {
				
				MetadataEntry mentry = null;
				
				if(entry.getValue() instanceof String) {
					mentry = MetadataEntry.create(meta,entry.getKey(), (String) entry.getValue());
				} else if(entry.getValue() instanceof Long) {
					mentry = MetadataEntry.create(meta,entry.getKey(), (Long) entry.getValue());
				} else {
					// ignored
				}
				
				if(mentry != null) {
					mentry = entryRepo.save(mentry);
					meta.getEntries().add(mentry);
				}
				
			}
			
		}

	}


}
