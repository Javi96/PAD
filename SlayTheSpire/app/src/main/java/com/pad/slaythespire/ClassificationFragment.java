package com.pad.slaythespire;


import android.os.Bundle;
import android.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class ClassificationFragment extends Fragment {


    public ClassificationFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        ArrayList<String> dataList = new ArrayList<>();
        dataList.add("hiii");
        dataList.add("hooo");
        View view = inflater.inflate(R.layout.fragment_classification, container, false);
        RecyclerView recyclerView  = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity()));

        ClassificationAdapter classificationAdapter = new ClassificationAdapter(dataList);
        recyclerView.setAdapter(classificationAdapter);


        return inflater.inflate(R.layout.fragment_classification, container, false);
    }

}
